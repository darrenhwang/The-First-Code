/**
 *Created by hgx
 *Date:2022/2/19
 *Time:16:30
 *Content:
 */
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getName() {
    return new Promise(resolve => {
        rl.question('输入name：', (name) => {
            resolve(name)
        });
    })
}

function getAge() {
    return new Promise(resolve => {
        rl.question('输入age：', (age) => {
            // 一个close就可以了
            rl.close();
            resolve(age)
        });
    })
}

async function getInfo() {
    const name = await getName()
    const age = await getAge()

    console.log(name + '的年龄是：' + age)
}

getInfo()