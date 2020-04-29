# CRIC Cervix Cell Segmentations

400 images from microscope slides of the uterine cervix using the conventional smear (Pap smear) and the **some** cell segmentation.

## How to Cite

Mariana, Claudia, Alessandra.

## Data Fields

- `image_id`

  This is the integer that identifies the image at http://database.cric.com.br/.
- `image_filename`

  This is the name that identifies the image in the ZIP file that you have.
- `image_doi`

  This is the DOI that identifies the image.
- `cell_id`

  This is the integer that identifies the cell at http://database.cric.com.br/.
- `description_id`

  This is the integer that identifies the description of the cell.
- `x`

  Integer between 1 and 1376 equal to coordinate x of the pixel that is part of the segmentation.
- `y`

  Integer between 1 and 1020 equal to coordinate y of the pixel that is part of the segmentation.
- `is_nucleus`

   1 if the `x` and `y` are front the segmentation of the nucleus. 0 otherwise.