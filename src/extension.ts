'use strict';

import * as vscode from 'vscode';

function getTaskNames() : Set<string>
{
    let config = vscode.workspace.getConfiguration('tasks');
    let result = new Set<string>();

    if ( 'tasks' in config && config.tasks instanceof Array)
    {
        for( let task of config.tasks )
        {
            if ( 'taskName' in task && typeof(task.taskName) == 'string' && task.taskName.length > 0 )
            {
                result.add(task.taskName);
            }
        }
    }

    return result;
}

export function activate(context: vscode.ExtensionContext) 
{
    const currentCommands = new Map<string,vscode.Disposable>();

    function registerTask(taskName: string)
    {
        let commandName = `task-commands.${taskName}`;

        let cmd = vscode.commands.registerCommand(commandName, () => 
        {
            vscode.commands.executeCommand('workbench.action.tasks.runTask', taskName);
        });

        currentCommands.set(taskName, cmd);
        context.subscriptions.push(cmd);        
    }

    function updateTaskCommands()
    {
        const taskNames = getTaskNames();

        const disposed = new Array<string>();

        for( let [t, d] of currentCommands.entries() )
        {
            if( ! taskNames.has(t) )
            {
                d.dispose();
                disposed.push(t);
            }
        }

        for( let t of disposed )
        {
            currentCommands.delete(t);
        }

        for( let t of taskNames )
        {
            if( ! currentCommands.has(t) )
            {
                registerTask(t);
            }
        }
    }

    vscode.workspace.onDidChangeConfiguration( ()=>updateTaskCommands() );
    updateTaskCommands();
}

export function deactivate() {
}
