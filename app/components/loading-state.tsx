export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
    </div>
  );
}
