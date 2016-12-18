# Developer Guide
* [Guidelines for New Contributors](#guidelines-for-new-contributors)
* [Coding Standards](#coding-standards)
* [How to preview changes](#how-to-preview-changes)
    * [Preview a week in schedule](#preview-a-week-in-schedule)
    * [Preview a handbook section](#preview-a-handbook-section)
    * [Preview local files in Google Chrome](#preview-local-files-in-google-chrome)
* [How to stage changes](#how-to-stage-changes)
* [Tool Stack](#tool-stack)
    * [Development environment](#development-environment)
    * [Tools used in implementation](#tools-used-in-implementation)

## Guidelines for New Contributors
* Asking a Question
* Posting an Issue
* Submitting Your First PR
* Naming Conventions (Branch name and PR title)
* Git Usage Guidelines (Commit messages)

Refer to: https://github.com/oss-generic/process/#guidelines-for-new-contributors

## Coding Standards
* [JavaScript](https://docs.google.com/document/d/1gZ6WG6HBTJYHAtVkz9kzi_SUuzfXqzO-SvFnLuag2xM/pub?embedded=true)
* [CSS](https://docs.google.com/document/d/1wA9paRA9cS7ByStGbhRRUZLEzEzimrNQjIDPVqy1ScI/pub)
* [HTML](https://oss-generic.github.io/process/codingstandards/coding-standards-html.html)

## How to preview changes

#### Preview a week in schedule
[`.../contents/week.html?preview=1`](http://nus-cs2103.github.io/website/contents/week.html?preview=1)
> `preview` can be any of weeks `0`-`14`.

#### Preview a handbook section
[`.../contents/handbook.html?preview=preliminaries`](http://nus-cs2103.github.io/website/contents/handbook.html?preview=preliminaries)
> `preview` can be any section/subsection `id` in handbook.html, **without** the `handbook-` prefix.

#### Preview local files in Google Chrome
You will need to start Chrome with the flag `--allow-file-access-from-files`:
* The path for Chrome can be found at `chrome://version`.
* All windows for Chrome **must** be closed before launching.
* You may create a shortcut to launch Chrome with this flag.

## How to stage changes
To create a [*staging site*](https://en.wikipedia.org/wiki/Staging_site) using
[*RawGit*](https://rawgit.com/), commit your changes and push the branch to your fork.
A running version of the website should now be available from the corresponding
`rawgit.com` URL of the form `http://rawgit.com/user/repo/branch/`,  
e.g. [http://rawgit.com/acjh/website/112-fix-loading-overlay-handbook/](http://rawgit.com/acjh/website/112-fix-loading-overlay-handbook/).

## Tool Stack

#### Development environment
* **GitHub**
  Used to host the repo and code reviewing.
* **Google Chrome DevTools** (recommended)
  Used to iterate, debug and profile the site.
* **Atom** (recommended)
  Used as a text editor, automatically removes trailing whitespaces and newlines.
* **SourceTree** (recommended)
  Used as a GUI client for Git.

#### Tools used in implementation
* **HTML** [version 5], **JavaScript**, **CSS**
* **jQuery** [version 1.11.3]
  jQuery is a JavaScript Library that simplifies HTML document traversing, event handling, animating, and Ajax interactions for rapid web development.
* **jQuery UI** [version 1.11.3]
  jQuery UI is a curated set of user interface interactions, effects, widgets, and themes built on top of the jQuery JavaScript Library.
