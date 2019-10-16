# -*- coding: utf-8 -*-
"""facial_expression_model_inference.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1qJHresE-FfJ6Q8DH7bGw6Iiji4b3--RR
"""

# from google.colab import drive
# drive.mount('/content/drive')

"""##**Libraries**"""

# Import needed packages
import os
import numpy as np
import cv2
# from keras.models import Sequential
# from keras.layers import Dense
from keras.models import load_model

# from google.colab.patches import cv2_imshow

"""##**Generate predictions**"""

def expression_model_inference(image_frame):
    # Load the model previously trained
    model_name = 'ai_module/facial_expression/facial_expression_model_train.h5'
    model = load_model(model_name)

    # Set image parameters
    width = 48
    height = 48
    x=None
    y=None
    color_conversion = cv2.COLOR_RGB2GRAY
    labels = ['Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']

    frame = cv2.imread(image_frame)
    gray_frame = cv2.cvtColor(frame,color_conversion)
    face_detector = cv2.CascadeClassifier('ai_module/facial_expression/haarcascade_frontalface_default.xml')
    face_rectangle = face_detector.detectMultiScale(gray_frame, 1.3, 10)

    # Face detection
    for (x, y, w, h) in face_rectangle:
          roi_gray = gray_frame[y:y + h, x:x + w]
          cropped_image = np.expand_dims(np.expand_dims(cv2.resize(roi_gray, (48, 48)), -1), 0)
          cv2.normalize(cropped_image, cropped_image, alpha=0, beta=1, norm_type=cv2.NORM_L2, dtype=cv2.CV_32F)
          cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 1)
          # Emotion prediction
          yhat= model.predict(cropped_image)
          cv2.putText(frame, labels[int(np.argmax(yhat))], (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 1, cv2.LINE_AA)
          print("Emotion: "+labels[int(np.argmax(yhat))])

    ret, jpeg = cv2.imencode('.jpg', frame)
    return jpeg.tobytes(), jpeg

