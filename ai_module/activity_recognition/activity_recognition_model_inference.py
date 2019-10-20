# -*- coding: utf-8 -*-
# Import needed packages
import os
import numpy as np
import cv2
from keras.models import Sequential
from keras.layers import Dense
from keras.models import load_model

"""##**Generate predictions**"""


def activity_model_inference():
    # Load the model previously trained
    model_name = r'3dcnn_result_v2\fall_3dcnnmodel-gpu.hd5'
    model = load_model(model_name)

    # Set image parameters
    width = 224
    height = 224
    channels = 3
    frame_buffer_length = 5
    x = None
    y = None
    color_conversion = cv2.COLOR_RGB2GRAY

    labels = ['Fall', 'NotFall']

    # Load images
    test_image_folder = r'dataset\IMG_0727_MOV'
    img_files = os.listdir(test_image_folder)
    img_files = sorted(img_files)

    batches = []
    nr_iter = len(img_files)//5
    for i in range(nr_iter):
        frame_stack = []
        for j in range(5):
            image_frame = test_image_folder + "\\" + img_files[i * 5 + j]
            frame = cv2.imread(image_frame)
            frame = cv2.resize(frame, (width, height))
            frame_stack.append(frame/255)
        batches.append(np.array(frame_stack))

    for i in range(nr_iter):
        curr_stack_frames = np.expand_dims(batches[i], axis=0)
        curr_stack_frames = curr_stack_frames.transpose((0, 2, 3, 1, 4))
        predicted_activity = model.predict(curr_stack_frames)
        print(labels[np.argmax(predicted_activity)])
        cv2.imshow("frame", batches[i][0])
        cv2.waitKey()


activity_model_inference()
