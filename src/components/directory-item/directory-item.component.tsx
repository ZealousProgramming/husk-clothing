import { FunctionComponent } from "react";
import { DirectoryCategory } from "../directory/directory.component";
import "./directory-item.styles.scss";

type DirectoryItemProps = {
	category: DirectoryCategory;
}

const DirectoryItem: FunctionComponent<DirectoryItemProps> = (props) => {
	return (
		<div className="directory-item-container" key={props.category.id}>
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${props.category.imageUrl})`,
				}}
			/>
			<div className="body">
				<h2>{props.category.title}</h2>
				<p>Show Now</p>
			</div>
		</div>
	);
};

export default DirectoryItem;
