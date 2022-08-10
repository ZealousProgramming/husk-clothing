import "./directory.styles.scss";
import CategoryItem from "../category-item/category-item.component.js";

const Directory = (props) => {
	return (
		<div className="directory-container">
			{props.categories.map((category) => (
				<CategoryItem category={category} key={category.id} />
			))}
		</div>
	);
};

export default Directory;
