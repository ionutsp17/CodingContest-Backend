import numpy as np
import os
import cv2


class VideoBuffering:

    def __init__(self, width, height, depth):
        self.width = width
        self.height = height
        self.depth = depth  # number of consecutive frames

    def get_buffered_frames(self, filename):
        images_from_folder = os.listdir(filename)
        sorted(images_from_folder)

        no_images = len(images_from_folder)
        no_batch = no_images//self.depth

        batch_array = []
        for batch_idx in range(no_batch):
            frame_array = []
            for image_idx in range(self.depth):
                img_path = os.path.join(filename, images_from_folder[batch_idx*self.depth + image_idx])
                img = cv2.imread(img_path)
                img = cv2.resize(img, (self.height, self.width))
                frame_array.append(img)
            batch_array.append(np.array(frame_array))

        if len(batch_array) == 0:
            return None
        return np.array(batch_array)

    def get_classname(self, filename):
        x = filename[filename.find('_') + 1:filename.find('_', 2)]
        return x
