'use strict'

/**
 * import {TaskQueue} from '../../libs/TaskQueue'
 // sleepBetweenTasks: init 3 task, sau khi chạy xong một task chờ sleepBetweenTasks sau đó mới tiếp tục add task mới
 let taskQueue = new TaskQueue({'sleepBetweenTasks': 0, 'concurrency': 3});

            function myCreateTask(i) {
                return async function () {
                    console.log("Task " + i);
                    // Thực hiện tác vụ của task
                    await wait(1000);

                    return 100;
                };
            }

            for (let i = 0; i < 10; i++) {
                let result = await taskQueue.addTask(myCreateTask(i));
                console.log("Result = ", result);
            }
 */
export class TaskQueue {
    private options: { sleepBetweenTasks: number; concurrency: number };
    private _queue: any[];
    private _currentConcurrentTasks: number;
    private _lastTaskId: number;

    constructor(options: { sleepBetweenTasks: number, concurrency: number }) {
        this.options = options;
        this._queue = [];
        this._currentConcurrentTasks = 0;
        this._lastTaskId = 0;
    }

    public addTask(taskFunction, isReturnPromise): any {
        if (isReturnPromise) {
            let promise = new Promise(function (this: TaskQueue, resolve, reject) {
                this._queue.push(new Task(this._lastTaskId++, taskFunction, resolve, reject))
            });
            setTimeout(this.scheduleTasks.bind(this), 0);
            return promise
        } else {
            this._queue.push(new Task(this._lastTaskId++, taskFunction));
            setTimeout(this.scheduleTasks.bind(this), 0);
        }
    }

    private wrapCallback(task) {
        setTimeout(() => {
            this._currentConcurrentTasks--;
            setTimeout(this.scheduleTasks.bind(this), 0);
        }, this.options.sleepBetweenTasks);
    }

    private length() {
        return this._queue.length
    }

    private scheduleTasks() {
        if (this._queue.length) { // we have tasks to schedule
            if (this._currentConcurrentTasks < this.options.concurrency) { // we got free 'threads' to schedule a task for
                let task = this._queue.shift();
                this._currentConcurrentTasks++;
                setTimeout(async () => {
                    await task.run();
                    this.wrapCallback(task)
                }, 0)
            }
        }
    }
}

class Task {
    actionFunc;
    resolve?;
    reject?;
    private _task: { taskId: any };

    constructor(taskId, actionFunc, resolve?, reject?) {
        this.actionFunc = actionFunc;
        this.resolve = resolve;
        this.reject = reject;
        this._task = {
            'taskId': taskId,
        }
    }

    async run() {
        if (this.resolve) {
            try {
                this.resolve(await this.actionFunc())
            } catch (e) {
                this.reject(e)
            }
        } else
            await this.actionFunc()
    }
}
