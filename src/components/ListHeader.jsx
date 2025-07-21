export default function listHeader() {
  return (
    <div className="mt-2 px-3 sm:block hidden md:grid grid-cols-5 gap-2">
      <p className="text-blue-800">No</p>
      <p className="text-blue-800">Date & Time</p>
      <p className="text-blue-800">Task</p>
      <p className="text-blue-800">Description</p>
      <p className="text-blue-800">Action</p>
    </div>
  );
}
