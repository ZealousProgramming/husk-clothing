import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component.js";

const Directory = (props) => {
	return (
		<div className="directory-container">
			{props.categories.map((category) => (
				<DirectoryItem category={category} key={category.id} />
			))}
		</div>
	);
};

export default Directory;
