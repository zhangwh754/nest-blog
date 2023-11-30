/**
 * @description: 获取随机时间戳
 * @param {number} start
 * @param {number} end
 */
export const getRandomTimestamp = (start: number = new Date('2018-01-01').getTime(), end: number = Date.now()) => {
  // 生成一个介于 start 和 end 之间的随机数
  const randomTime = start + Math.random() * (end - start)

  // 将随机数转换为整数，以获取时间戳
  return Math.floor(randomTime)
}
