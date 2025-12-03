import { ToyPreview } from "./ToyPreview";

export function ToyList({toys}){

    return(
        <ul>
            {toys.map(
               toy=>
                <li key={toy._id}>
                <ToyPreview toy={toy}/>
                <div>
                    <button>Remove</button>
                    <button>Edit</button>
                </div>
                </li> 
            )}
        </ul>
    )
}