# CRIC Cervix Cell Classifications

400 images from microscope slides of the uterine cervix using the conventional smear (Pap smear) and the epithelial cell abnormalities classified according to Bethesda system.

## How to Cite

Rezende, Mariana Trevisan; Tobias, Alessandra Hermógenes Gomes; Silva, Raniere; Oliveira, Paulo; Sombra de Medeiros, Fatima; Ushizima, Daniela; et al. (2020): CRIC Cervix Cell Classification. figshare. Collection. https://doi.org/10.6084/m9.figshare.c.4960286.v2

## Data Fields

- `image_id`

  This is the integer that identifies the image at http://database.cric.com.br/.
- `image_filename`

  This is the name that identifies the image in the ZIP file that you have.
- `image_doi`

  This is the DOI that identifies the image.
- `cell_id`

  This is the integer that identifies the cell at http://database.cric.com.br/.
- `bethesda_system`

  Classification of the cell
  using the Bethesda system.
  It is on of the following:

  - Negative for intraepithelial lesion
  - ASC-US

    Atypical squamous cells of undetermined significance
  - ASC-H

    Atypical squamous cells cannot exclude HSIL
  - LSIL

    Low grade squamous intraepithelial lesion
  - HSIL

    High grade squamous intraepithelial lesion
  - SCC

    Squamous cell carcinoma
- `nucleus_x`

  Integer between 1 and 1376 equal to coordinate x of the pixel that represent the cell.
- `nucleus_y`

  Integer between 1 and 1020 equal to coordinate y of the pixel that represent the cell.