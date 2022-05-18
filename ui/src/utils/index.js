import { ElMessageBox, ElNotification } from "element-plus";

export const successNotification = (msg) => {
    ElNotification({
        title: 'Success',
        position: 'top-left',
        message: msg,
        type: 'success',
    })
}

export const errorNotification = (msg) => {
    ElNotification({
        title: 'Error',
        position: 'top-left',
        message: msg,
        type: 'error'
    })
}

export const infoNotification = (msg) => {
    ElNotification({
        title: 'Info',
        position: 'top-left',
        message: msg,
        type: 'info'
    })
}

export const msgConfirm = (msg, resolveMsg, rejectMsg) => {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(
            msg,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).then(async () => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}
