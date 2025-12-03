import { ToyPreview } from "./ToyPreview";

export function ToyList({toys,onRemoveToy}){

    return(
        <ul className="toy-list">
            {toys.map(
               toy=>
                <li key={toy._id}>
                <ToyPreview toy={toy} onRemoveToy={onRemoveToy}/>
                <div>
                    
                </div>
                </li> 
            )}
        </ul>
    )
}