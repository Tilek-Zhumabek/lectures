# Keep final PDFs separate from LaTeX's temporary files.
$pdf_mode = 1;
$out_dir = 'build';
$aux_dir = '.latex-aux';
$emulate_aux = 1;

# Also remove SyncTeX files when latexmk performs its normal cleanup.
$clean_ext .= ' synctex.gz';

