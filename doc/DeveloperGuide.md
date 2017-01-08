# Developer Guide
* [Guidelines for New Contributors](#guidelines-for-new-contributors)
* [Contributing to this Repository](#contributing-to-this-repository)
* [Coding Standards](#coding-standards)
* [How to preview changes](#how-to-preview-changes)
    * [Preview a week in schedule](#preview-a-week-in-schedule)
    * [Preview a handbook section](#preview-a-handbook-section)
    * [Preview local files in Google Chrome](#preview-local-files-in-google-chrome)
* [How to stage changes](#how-to-stage-changes)
* [Creating a pull request](#creating-a-pull-request)
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

## Contributing to this Repository
1. Fork this repo.
2. Make sure what you want to contribute is already listed as an open issue in our issue tracker.
   If it is not, post it as an issue first and wait for it to get accepted (an issue is considered
   'accepted' when it is assigned a `priority.*` label).
3. You may choose an issue labeled `forFirstTimers` as your first issue, if there are any.
   But do not do more than one `forFirstTimers` issues.
4. Clone your fork onto your Computer.
5. Create a branch. The branch name should be in the format `issue-number-some-key-words`,
   i.e. issue number followed by 2-4 key words related to the issue description,
   e.g. `112-fix-loading-overlay-handbook`.
6. Implement your fix in the new branch.  
   See [coding standards](#coding-standards).
7. Test the code in your computer.  
   See [preview local files in Google Chrome](#preview-local-files-in-google-chrome).
8. When the fix is ready,
   1. Ensure that your fork has the latest code from this repo (the repo you forked from is called
      the `upstream` repo). The code in the upstream repo may have been updated while you were fixing the issue.
      If that is the case, [sync your fork with upstream repo](https://help.github.com/articles/syncing-a-fork/).
   2. Stage your changes. Your reviewer might want to see how your changes look like to a viewer of the website.  
      See [how to stage changes](#how-to-stage-changes).
   3. Create a pull request (PR) against the `master` branch of this repo.  
      See [creating a pull request](#creating-a-pull-request).
   4. Check the diff view of the PR to ensure it contains the intended changes only.
9. Your code will be reviewed by someone from the dev team. If the reviewer requests changes,
   revise the code, push the new commits to your branch, and post a comment to say the pull request
   is ready for review again.
10. When your code is acceptable, it will be merged to this repo. Your fix will be included in the
    next release of the website.
11. After your fix is merged, you may wish to create another PR to add your name to the
    [`CONTRIBUTORS.md`](../CONTRIBUTORS.md) file.
    There is no need to create a corresponding issue for that PR.

## Coding Standards
* [JavaScript](https://docs.google.com/document/d/1gZ6WG6HBTJYHAtVkz9kzi_SUuzfXqzO-SvFnLuag2xM/pub?embedded=true)
* [CSS](https://docs.google.com/document/d/1wA9paRA9cS7ByStGbhRRUZLEzEzimrNQjIDPVqy1ScI/pub)
* [HTML](https://oss-generic.github.io/process/codingStandards/CodingStandard-Html.html)

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
e.g. http://rawgit.com/acjh/website/112-fix-loading-overlay-handbook/.

## Creating a pull request
* When naming the PR, copy and paste the name of the issue you are fixing, including the original issue number,  
  e.g. `Fix size and position of 'Page Loading...' overlay in handbook page #112`.
* In the PR description, mention `Fixes #IssueNumber` (e.g. `Fixes #112`) so that
  the corresponding issue is closed automatically when the PR is merged.
  Remember to mention the URL of the staging site in your PR description.  
  [Here](https://github.com/nus-cs2103/website/pull/202) is an example.

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
