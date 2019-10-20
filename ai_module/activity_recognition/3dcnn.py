import argparse
import os
import matplotlib

matplotlib.use('AGG')
import numpy as np
from keras.layers import (Activation, Conv3D, Dense, Dropout, Flatten,
                          MaxPooling3D, MaxPooling2D)
from keras.layers.advanced_activations import LeakyReLU
from keras.losses import categorical_crossentropy, binary_crossentropy
from keras.optimizers import Adam
from keras.utils import np_utils
from sklearn.model_selection import train_test_split

import videobuffering
from tqdm import tqdm

from keras.callbacks import ModelCheckpoint
from keras.models import Model
from keras.layers import Input, Dense
import keras
import math
import tensorflow as tf
import keras.backend as K
from itertools import product
from utils import plot_history, save_history


def my_data_loader(video_dir, buffering_obj, nclass, result_dir, color=False, skip=True):
    files = os.listdir(video_dir)
    X = []
    labels = []
    labellist = []

    pbar = tqdm(total=len(files))
    for idx, filename in enumerate(files):
        pbar.update(1)
        if filename == '.DS_Store':
            continue
        name = os.path.join(video_dir, filename)

        for v_files in os.listdir(name):

            v_file_path = os.path.join(name, v_files)
            label = buffering_obj.get_classname(filename)
            batch_of_frames = buffering_obj.get_buffered_frames(v_file_path)

            if batch_of_frames is None:
                continue

            if label not in labellist:
                if len(labellist) >= nclass:
                    continue
                labellist.append(label)
            labels.extend([label] * batch_of_frames.shape[0])
            X.append(batch_of_frames)

    pbar.close()
    with open(os.path.join(result_dir, 'classes.txt'), 'w') as fp:
        for i in range(len(labellist)):
            fp.write('{}\n'.format(labellist[i]))

    for num, label in enumerate(labellist):
        for i in range(len(labels)):
            if label == labels[i]:
                labels[i] = num

    if color:
        X = np.vstack(X)
        return X.transpose((0, 2, 3, 1, 4)) / 255, labels
    else:
        X = np.vstack(X)
        return X.transpose((0, 2, 3, 1)) / 255, labels


def my_generator(X_train, Y_train, nb_batch):
    t = X_train.shape[0] / nb_batch
    steps = math.floor(t)
    while 1:
        for i in range(steps):
            yield X_train[i * nb_batch:(i + 1) * nb_batch], Y_train[i * nb_batch:(i + 1) * nb_batch]


def w_categorical_crossentropy(y_true, y_pred, weights):
    nb_cl = len(weights)
    final_mask = K.zeros_like(y_pred[:, 0])
    y_pred_max = K.max(y_pred, axis=1)
    y_pred_max = K.reshape(y_pred_max, (K.shape(y_pred)[0], 1))
    y_pred_max_mat = K.equal(y_pred, y_pred_max)
    for c_p, c_t in product(range(nb_cl), range(nb_cl)):
        final_mask += (weights[c_t, c_p] * y_pred_max_mat[:, c_p] * y_true[:, c_t])
    return K.categorical_crossentropy(y_pred, y_true) * final_mask


def create_model(channel, frames, img_cols, img_rows, nb_classes):
    input_x = Input(shape=(img_rows, img_cols, frames, channel))
    initial_conv = Conv3D(16, kernel_size=(3, 3, 3), padding='same')(input_x)
    initial_conv = LeakyReLU(alpha=.001)(initial_conv)
    initial_conv = Conv3D(32, kernel_size=(3, 3, 3), padding='same')(initial_conv)
    initial_conv = LeakyReLU(alpha=.001)(initial_conv)
    ###########################
    # PARALLEL 1
    conv1 = Conv3D(16, kernel_size=(1, 1, 1), padding='same')(initial_conv)
    conv1 = LeakyReLU(alpha=.001)(conv1)
    conv1 = MaxPooling3D(pool_size=(2, 2, 2), padding='same')(conv1)
    conv1 = Conv3D(16, kernel_size=(3, 3, 3), padding='same')(conv1)
    conv1 = LeakyReLU(alpha=.001)(conv1)
    conv1 = MaxPooling3D(pool_size=(2, 2, 2), padding='same')(conv1)
    conv1 = Conv3D(1, kernel_size=(1, 1, 1), padding='same')(conv1)
    conv1 = LeakyReLU(alpha=.001)(conv1)
    ##############################
    # Parallel 2
    conv2 = Conv3D(8, kernel_size=(1, 1, 1), padding='same')(initial_conv)
    conv2 = LeakyReLU(alpha=.001)(conv2)
    conv2 = MaxPooling3D(pool_size=(2, 2, 2), padding='same')(conv2)
    conv2 = Conv3D(8, kernel_size=(3, 3, 3), padding='same')(conv2)
    conv2 = LeakyReLU(alpha=.001)(conv2)
    conv2 = MaxPooling3D(pool_size=(2, 2, 2), padding='same')(conv2)
    conv2 = Conv3D(1, kernel_size=(1, 1, 1), padding='same')(conv2)
    conv2 = LeakyReLU(alpha=.001)(conv2)
    ##############################
    # Parallel 3
    conv3 = Conv3D(4, kernel_size=(1, 1, 1), padding='same')(initial_conv)
    conv3 = LeakyReLU(alpha=.001)(conv3)
    conv3 = MaxPooling3D(pool_size=(2, 2, 2), padding='same')(conv3)
    conv3 = Conv3D(4, kernel_size=(3, 3, 3), padding='same')(conv3)
    conv3 = LeakyReLU(alpha=.001)(conv3)
    conv3 = MaxPooling3D(pool_size=(2, 2, 2), padding='same')(conv3)
    conv3 = Conv3D(1, kernel_size=(1, 1, 1), padding='same')(conv3)
    conv3 = LeakyReLU(alpha=.001)(conv3)
    ###################################
    added = keras.layers.Add()([conv1, conv2, conv3])
    added = MaxPooling3D(pool_size=(2, 2, 2), padding='same')(added)
    added = Flatten()(added)
    dense_1 = Dense(784, activation='relu')(added)
    # dense_2 = Dense(nb_classes, activation='softmax')(dense_1)
    dense_2 = Dense(nb_classes, activation='sigmoid')(dense_1)
    print("output layer shape:", dense_2.shape)
    model = Model(input_x, dense_2)
    return model


def main():
    parser = argparse.ArgumentParser(
        description='simple 3D convolution for action recognition')
    parser.add_argument('--batch', type=int, default=1)
    parser.add_argument('--epoch', type=int, default=100)
    parser.add_argument('--videos', type=str, default='UCF101',
                        help='directory where videos are stored')
    parser.add_argument('--nclass', type=int, default=101)
    parser.add_argument('--output', type=str, required=True)
    parser.add_argument('--color', type=bool, default=False)
    parser.add_argument('--skip', type=bool, default=True)
    parser.add_argument('--depth', type=int, default=5)
    args = parser.parse_args()

    img_rows, img_cols = 224, 224
    frames = args.depth
    nb_classes = args.nclass
    nb_batch = args.batch
    channel = 3 if args.color else 1

    if not os.path.isdir(args.output):
        os.makedirs(args.output)

    buffering_obj = videobuffering.VideoBuffering(img_rows, img_cols, frames)
    x, y = my_data_loader(args.videos, buffering_obj, nb_classes,
                          args.output, args.color, args.skip)

    print("Loaded data:")
    print('x:', x.shape)
    print('y:', len(y))
    X = x
    Y = np_utils.to_categorical(y, nb_classes)
    X = X.astype('float32')

    print('X_shape:{}\nY_shape:{}'.format(X.shape, Y.shape))

    # Define model
    model = create_model(channel, frames, img_cols, img_rows, nb_classes)
    model.compile(loss=binary_crossentropy,
                  optimizer=Adam(), metrics=['accuracy'])
    model.summary()

    # Split dataset in train and test
    X_train, X_test, Y_train, Y_test = train_test_split(
        X, Y, test_size=0.2, random_state=43)
    print("Train data: ", X_train.shape)
    print("Test data:  ", X_test.shape)

    # Define model checkpoints
    filepath = os.path.join(args.output, "fall_3dcnnmodel-{epoch:02d}-{val_acc:.2f}.hd5")
    checkpoint = ModelCheckpoint(filepath, monitor='val_accuracy', verbose=1, save_best_only=True, mode='max')
    callbacks_list = [checkpoint]

    print("=============  TRAIN MODEL ================")
    # class_weight = {0: 1.3, 1: 1}  # balansarea datelor 0: fall, 1:notfall
    my_gen = my_generator(X_train, Y_train, nb_batch)
    history = model.fit_generator(my_gen,
                                  validation_data=(X_test, Y_test),
                                  samples_per_epoch=X_train.shape[0] // nb_batch,
                                  epochs=args.epoch,
                                  verbose=1,
                                  shuffle=True,
                                  callbacks=callbacks_list)
                                  # class_weight=class_weight)

    print("=============  EVALUATE MODEL ================")
    model.evaluate(X_test, Y_test, verbose=0)
    model.save(os.path.join(args.output, 'fall_3dcnnmodel-gpu.hd5'))

    loss, acc = model.evaluate(X_test, Y_test, verbose=0)
    print('Test loss:', loss)
    print('Test accuracy:', acc)

    plot_history(history, args.output)
    save_history(history, args.output)


if __name__ == '__main__':
    main()
    print("\n\nALL DONE!\n\n")
