export default function LoadingStatement() {
  return (
    <div className="flex w-full items-center justify-center h-screen">
      <span className="loading loading-spinner text-warning" />
      <p className="pl-4 font-mono">loading...</p>
    </div>
  );
}
