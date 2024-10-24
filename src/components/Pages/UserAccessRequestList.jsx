import {
  useGetUsersQuery,
  useGiveAccessUserMutation,
} from "../../Features/admin/userAccessRequestApi";
import Navigation from "../Shared/Navigation";

const UserAccessRequestList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();
  const [
    giveAccessUser,
    {
      isSuccess: giveAccessSuccess,
      isLoading: giveAccessLoading,
      error: giveAccessError,
      refetch,
    },
  ] = useGiveAccessUserMutation();

  const handleGrantAccess = (userId) => {
    // Function to handle granting moderation access
    console.log(`Granting moderation access to user with ID: ${userId}`);
    giveAccessUser({ userId });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading users.</p>;

  return (
    <>
      <Navigation />
      <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center underline">
            User Access Requests
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">No</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Request</th>
                  <th className="px-4 py-2 border">Delete</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border flex items-center justify-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border">{user.name}</td>
                    <td className="px-4 py-2 border">{user.email}</td>
                    <td className="px-4 py-2 border">{user.status}</td>
                    <td className="px-4 py-2 border">{user.request}</td>
                    <td className="px-4 py-2 border hover:bg-red-500 cursor-pointer hover:text-white">
                      Delete
                    </td>
                    <td className="px-4 py-2 border flex items-center justify-center">
                      {user.status === "user" && (
                        <button
                          onClick={() => handleGrantAccess(user._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          {giveAccessLoading
                            ? "Granting..."
                            : "Grant Moderator Access"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserAccessRequestList;
