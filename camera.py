import cv2
from streamable import Streamable

class VideoCamera(Streamable):
    def __init__(self, camera_index):
        self.__video = cv2.VideoCapture(camera_index)
        if self.__video is None or not self.__video.isOpened():
            print('There is no camera with index')

    def __de__(self):
        self.__video.release()

    def get_frame(self):
        success, image = self.__video.read()
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes(), image