import { redirect } from "next/navigation";
import Page from "../ui/components/Page";
import Resume from "../ui/components/resume/Resume";
import { getLoggedInUser } from "../lib/utils/loggedInUser";
import { toPlainObject } from "../lib/utils/utils";

export default async function DashboardPage() {
    const user = await getLoggedInUser();

    if (!user || !user.email) {
        redirect("/login");
    }

    return (
        <Page
            userName={user.name || "User"}
            userImage={user.image || ""}
            title="Dashboard">
            <Resume user={toPlainObject(user)} />
        </Page>
    );
}
