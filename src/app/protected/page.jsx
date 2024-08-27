import ProtectedRoute from "@/components/ProtectedRoute";
export default function Page() {
  return (
    <ProtectedRoute>
      <div>this is a protected page</div>
    </ProtectedRoute>
  );
}
