'use strict';
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
    constructor(options) {
        this.options = options;
        this._queue = [];
        this._currentConcurrentTasks = 0;
        this._lastTaskId = 0;
    }
    addTask(taskFunction, isReturnPromise) {
        if (isReturnPromise) {
            let promise = new Promise(function (resolve, reject) {
                this._queue.push(new Task(this._lastTaskId++, taskFunction, resolve, reject));
            });
            setTimeout(this.scheduleTasks.bind(this), 0);
            return promise;
        }
        else {
            this._queue.push(new Task(this._lastTaskId++, taskFunction));
            setTimeout(this.scheduleTasks.bind(this), 0);
        }
    }
    wrapCallback(task) {
        setTimeout(() => {
            this._currentConcurrentTasks--;
            setTimeout(this.scheduleTasks.bind(this), 0);
        }, this.options.sleepBetweenTasks);
    }
    length() {
        return this._queue.length;
    }
    scheduleTasks() {
        if (this._queue.length) { // we have tasks to schedule
            if (this._currentConcurrentTasks < this.options.concurrency) { // we got free 'threads' to schedule a task for
                let task = this._queue.shift();
                this._currentConcurrentTasks++;
                setTimeout(async () => {
                    await task.run();
                    this.wrapCallback(task);
                }, 0);
            }
        }
    }
}
class Task {
    constructor(taskId, actionFunc, resolve, reject) {
        this.actionFunc = actionFunc;
        this.resolve = resolve;
        this.reject = reject;
        this._task = {
            'taskId': taskId,
        };
    }
    async run() {
        if (this.resolve) {
            try {
                this.resolve(await this.actionFunc());
            }
            catch (e) {
                this.reject(e);
            }
        }
        else
            await this.actionFunc();
    }
}
