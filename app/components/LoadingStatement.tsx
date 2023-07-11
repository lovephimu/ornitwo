export default function LoadingStatement() {
  return (
    <div className="flex w-full items-center justify-center sm:h-full h-40">
      <span className="loading loading-spinner text-warning" />
      <p className="pl-4 font-mono">loading...</p>
    </div>
  );
}
