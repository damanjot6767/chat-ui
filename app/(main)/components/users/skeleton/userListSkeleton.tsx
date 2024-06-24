import UserItemSkeleton from "./userItemSkeleton"

let count = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)
export default function UsersListLoading() {
    
    return <div className="w-full">
      {count.map((item)=><UserItemSkeleton key = {item}/>)}
    </div>
  }