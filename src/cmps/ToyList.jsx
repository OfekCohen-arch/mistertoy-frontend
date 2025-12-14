import { ToyPreview } from "./ToyPreview";

export function ToyList({toys,onRemoveToy}){

    return(
        <ul className="toy-list">
            {toys.length>0 &&toys.map(
               toy=>
                <li key={toy._id}>
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy}/>
                
                </li> 
            )}
            {
                toys.length === 0 &&
                <p>There are not Toys yet...</p>
            }
        </ul>
    )
}