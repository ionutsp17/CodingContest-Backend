# Import needed packages
import numpy as np
import cv2
import face_recognition

from keras.models import Sequential
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D, BatchNormalization
from keras.regularizers import l2


def expression_model_inference(emotion_model, image_frame):
    # Set image parameters
    width = 48
    height = 48
    x = None
    y = None
    color_conversion = cv2.COLOR_RGB2GRAY
    labels = ['Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

    # frame = cv2.imread(image_frame)
    frame = image_frame
    gray_frame = cv2.cvtColor(frame, color_conversion)
    cv2.imwrite("frame.png", gray_frame)
    # face_rectangle = face_detector.detectMultiScale(gray_frame) #, 1.3, 10)
    face_locations  = face_recognition.face_locations(gray_frame)

    for face_rectangle in face_locations:
        # (top, left, bottom, right) = face_rectangle
        (top, right, bottom, left) = face_rectangle
        roi_gray = gray_frame[top:bottom, left:right]
        cv2.imwrite("face.png", roi_gray)
        roi_gray = cv2.resize(roi_gray, (48, 48))
        roi_gray = roi_gray.astype("float") / 255.0
        roi_gray = np.array(roi_gray)
        roi_gray = np.expand_dims(roi_gray, axis=0)
        roi_gray = np.expand_dims(roi_gray, axis=-1)
        # ##cv2.normalize(cropped_image, cropped_image, alpha=0, beta=1, norm_type=cv2.NORM_L2, dtype=cv2.CV_32F)
        cv2.rectangle(frame, (top, left), (bottom, right), (0, 255, 0), 1)

        # Emotion prediction
        yhat = emotion_model.predict(roi_gray)
        cv2.putText(frame, labels[int(np.argmax(yhat))], (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 1, cv2.LINE_AA)
        print("Emotion: " + labels[int(np.argmax(yhat))])

    ret, jpeg = cv2.imencode('.jpg', frame)
    return jpeg.tobytes()


def build_model():
    num_features = 64
    num_labels = 7
    batch_size = 64
    epochs = 5
    width, height = 48, 48

    model = Sequential()

    model.add(Conv2D(num_features, kernel_size=(3, 3), activation='relu', input_shape=(width, height, 1),
                     data_format='channels_last', kernel_regularizer=l2(0.01)))
    model.add(Conv2D(num_features, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Dropout(0.5))

    model.add(Conv2D(2 * num_features, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(Conv2D(2 * num_features, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Dropout(0.5))

    model.add(Conv2D(2 * 2 * num_features, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(Conv2D(2 * 2 * num_features, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Dropout(0.5))

    model.add(Conv2D(2 * 2 * 2 * num_features, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(Conv2D(2 * 2 * 2 * num_features, kernel_size=(3, 3), activation='relu', padding='same'))
    model.add(BatchNormalization())
    model.add(MaxPooling2D(pool_size=(2, 2), strides=(2, 2)))
    model.add(Dropout(0.5))

    model.add(Flatten())

    model.add(Dense(2 * 2 * 2 * num_features, activation='relu'))
    model.add(Dropout(0.4))
    model.add(Dense(2 * 2 * num_features, activation='relu'))
    model.add(Dropout(0.4))
    model.add(Dense(2 * num_features, activation='relu'))
    model.add(Dropout(0.5))

    model.add(Dense(num_labels, activation='softmax'))
    return model
