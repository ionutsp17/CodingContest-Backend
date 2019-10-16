from streamable import Streamable
import cv2


class VideoFileStreamer(Streamable):
    def __init__(self, sourceUri):
        self.__video = cv2.VideoCapture(sourceUri)

    def __de__(self):
        self.__video.release()

    def get_frame(self):
        success, image = self.__video.read()
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes(), image
