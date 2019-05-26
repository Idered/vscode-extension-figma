# Figma x VS Code

## Features

### Styles listing and copying CSS

### Listing layer tree and

## Requirements

To use this extension, you need two things:

- Figma Personal Access Token
- Team ID

### Figma Personal Access Token

1. Go to Account Settings in Figma application
2. Click on `Create a new personal access token`
3. Name your token
4. Copy new token
5. In VS Code open commands menu and execute `Figma: Connect` command
6. Paste your figma token and press enter

### Team

You must be a part of any team to be able to browse and select files. To get your team id:

1. Go to Figma web application
2. Click on any team in the sidebar
3. Copy id from url: `https://www.figma.com/files/team/ID/Eyedea`
4. In VS Code open commands menu and execute `Figma: Add Team` command
5. Type in your team name
6. Paste team id and press enter
7. You're now able to select any team file using `Figma: Select File` from command palette.

## Limitations

Browsing files works only for teams. You can't browse your drafts. In future, there will be support for adding single files by id.

## Roadmap

- [Commands] Add single file by id
- [Tree View] Copy css of selected layer
- [Tree View] Import images from figma to workspace
- [Tree View] Copy layer text
- [Tree View] Icon for each type of layer(group, frame, text, rectangle, etc.)
- [Preview] Better embed something like Zeplin - select layer by click, see css of selected layer

## Release Notes

### 0.1.0

Initial release:

- Connecting with figma
- Adding teams
- Loading a figma design
- Loading design styles
- Loading design layers
- Preview of top level frames
