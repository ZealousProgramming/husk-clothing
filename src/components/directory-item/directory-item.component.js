import "./directory-item.styles.scss";

const DirectoryItem = (props) => {
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
