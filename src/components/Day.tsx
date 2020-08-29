import React, { FunctionComponent, useEffect, useState } from 'react'

const Day: FunctionComponent = () => {
  const [value, setValue] = useState<number | ''>('')
  const [data, setData] = useState<string | null>(null)
  useEffect(() => {
    if (!value) { return }
    let aborted = false
    fetch(`https://day.ebichu.cc/api/${value}`)
      .then((res) => res.json())
      .then((res) => {
        if (!aborted) {
          setData(JSON.stringify(res, null, 2))
        }
      })
    return () => { aborted = true }
  }, [value])
  return (
    <div>
      <label>
        输入日期：
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="1 - 365"
          type="number"
        />
      </label>
      <pre>{data}</pre>
    </div>
  )
}

export default Day
