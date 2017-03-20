# Irrelevant as of Visual Studio Code 1.10

# Task Commands 

Assigns a command for each task in tasks.json, so that keyboard shortcuts can be assigned for to each task.

## Usage

If your `.vscode/tasks.json` contains the following:


```json
{
    "version": "0.1.0",
    "tasks": [
        {
            "taskName": "hello",
            "command": "echo",
            "isShellCommand": true,
            "args": ["Hello World"],
            "showOutput": "always"
        },
        {
            "taskName": "hello-again",
            "command": "echo",
            "isShellCommand": true,
            "args": ["Hello World Again"],
            "showOutput": "always"
        }
    ]
}
```

This extension will automatically generate two commands named `task-command.hello` and `task-command.hello-again`. 

These commands can now be assigned shortcuts using `keybindings.json`. For example:

```json
[
    {
        "key": "f10",
        "command": "task-commands.hello"
    },
    {
        "key": "alt+f2",
        "command": "task-commands.hello-again"
    }
]
```
