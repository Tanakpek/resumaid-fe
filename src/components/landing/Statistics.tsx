export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: "2.7K+",
      description: "Users",
    },
    {
      quantity: "1.8K+",
      description: "Subscribers",
    },
    {
      quantity: "112",
      description: "Downloads",
    },
    {
      quantity: "1",
      description: "Product",
    },
  ];

  return (
    <section id="statistics">
      <div className="tw-grid tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="tw-space-y-2 tw-text-center"
          >
            <h2 className="tw-text-3xl sm:tw-text-4xl tw-font-bold ">{quantity}</h2>
            <p className="tw-text-xl tw-text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
