import React,{memo} from 'react'

const Child3 = ({count}) => {
    console.log("Child 3 render");
  return (
    <div>
        <h2>Child3 function component</h2>
<p>{count}</p>
    </div>
  )
}

// export default memo(Child3);
export default memo(Child3,(prevProps,nextProps)=>{
    return false
});

