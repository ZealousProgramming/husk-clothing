import ProductCard from "../product-card/product-card.component";
import { Link } from "react-router-dom";
import "./category-preview.styles.scss";
import { CategoryItem } from "../../store/categories/category.types";
import { FunctionComponent } from "react";

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
}

const CategoryPreview: FunctionComponent<CategoryPreviewProps> = (props) => {
	return (
		<div className="category-preview-container">
			<h2>
				<Link className="title" to={props.title}>
					{props.title.toUpperCase()}
				</Link>
			</h2>
			<div className="preview">
				{props.products
					.filter((_, idx) => idx < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;
