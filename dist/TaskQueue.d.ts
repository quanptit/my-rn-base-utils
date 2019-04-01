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
export declare class TaskQueue {
    private options;
    private _queue;
    private _currentConcurrentTasks;
    private _lastTaskId;
    constructor(options: {
        sleepBetweenTasks: number;
        concurrency: number;
    });
    addTask(taskFunction: any, isReturnPromise: any): any;
    private wrapCallback;
    private length;
    private scheduleTasks;
}
