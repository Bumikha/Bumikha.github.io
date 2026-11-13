AUTHOR = 'Bumikha'
SITENAME = 'Bumikha'
SITETITLE = 'Bumikha'
SITEURL = "https://bumikha.github.io/"
PATH = "content"
TIMEZONE = 'Asia/Kolkata'
DEFAULT_LANG = 'en'
THEME = 'theme'

# Disable URL hash fragments in article links
DISABLE_URL_HASH = True

# Copyright
COPYRIGHT_YEAR = 2026
COPYRIGHT_NAME = 'Bumikha'

# Dark mode support
THEME_COLOR_AUTO_DETECT_BROWSER_PREFERENCE = True
THEME_COLOR_ENABLE_USER_OVERRIDE = True

# Syntax highlighting
PYGMENTS_STYLE = 'github'  # Light mode
PYGMENTS_STYLE_DARK = 'native'  # Dark mode

# Static files
STATIC_PATHS = ['images', 'extra']
SITELOGO = '/images/bumikha.jpeg'

EXTRA_PATH_METADATA = {
    'extra/admin/index.html': {'path': 'admin/index.html'},
}

ARTICLE_EXCLUDES = ['extra']
PAGE_EXCLUDES = ['extra']

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Pages
DISPLAY_PAGES_ON_MENU = True

# Social widget
SOCIAL = (
    ("github", "https://github.com/Bumikha"),
    ("linkedin", "https://www.linkedin.com/in/bumikha-ramaraj-12a2b2396/"),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
