from camera import VideoCamera
from videoFileStreamer import VideoFileStreamer

class StreamManager(object):
    def __init__(self):
        self.__streamableSources = [VideoCamera(0), VideoFileStreamer('./resources/small.mp4')]

    def getStreamableSources(self):
        return self.__streamableSources.copy()

    def getStreamableSource(self, index):
        return self.__streamableSources[index] if index < len(self.__streamableSources) else None