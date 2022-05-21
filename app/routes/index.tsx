import Button from "~/components/Button";

export default function Index() {
	return (
			<div className="max-w-3xl mx-auto px-3 md:px-0 py-6">
				<h1>Title</h1>
				<h2>Subtitle</h2>
				<h3>Heading</h3>
				<h4>Strong</h4>
				<p>Body</p>
				<strong>Body Strong</strong>
				<p className="text-caption">Caption</p>
				<Button onClick={() => console.log("clicked")} to={""}>
					Button
				</Button>
				{/*<BlockTitle {...blockTitleData} />*/}
				<h3>
					<Button to={"/about"}>About {"->"}</Button>
				</h3>
			</div>	);
}
