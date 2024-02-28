# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))


# -- Project information -----------------------------------------------------


copyright = '2024, Rapporto'
html_show_copyright = True
html_show_sphinx = True


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
              'sphinx_tabs.tabs',
             ]



# Add any paths that contain templates here, relative to this directory.
#templates_path = ['_templates']

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = 'ru'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.

html_theme = 'sphinx_book_theme'

html_favicon = '_static/favicon.ico'

html_logo = '_static/logo-light.svg'

html_title = "Сайт документации Раппорто"

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".

html_static_path = ["_static"]

html_css_files = ["css/custom.css"]

templates_path = ["_templates"]

source_suffix = ['.rst', '.md']

html_context = {
   "default_mode": "light"
}

html_theme_options = {

    'collapse_navigation': True,
    "show_nav_level": 6,
    'navigation_depth': 6,
    "repository_url": "https://github.com/rapporto/docs",
    "use_repository_button": True,
    "toc_title": "Содержание",
    "use_fullscreen_button":False,
    "use_sidenotes": True,
    "logo": {
      "image_light": "_static/logo-light.svg",
      "image_dark": "_static/logo-dark.svg"
    },



}



