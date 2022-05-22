import Button from "~/components/Button";

export interface BlockContent {
  headline?: string;
  headlineLink?: string;
  title: string;
  subtitle?: string;
}

export default function BlockTitle({
  headline,
  headlineLink,
  title,
  subtitle,
}: BlockContent) {
  const headlineContent = (
    <h4 className="text-gray-light dark:text-gray-dark">{headline}</h4>
  );
  return (
    <div className="block-title flex flex-col items-center my-8 lg:my-16 px-5 lg:px-0">
      {headline &&
        (headlineLink ? (
          <Button className="mb-2" to="/tags/flutter">
            {headlineContent}
          </Button>
        ) : (
          <div className="mb-2">{headlineContent}</div>
        ))}

      <h2 className="text-subtitle text-center">{title}</h2>

      {subtitle && <div className="text-center mt-2">{subtitle}</div>}
    </div>
  );
}
