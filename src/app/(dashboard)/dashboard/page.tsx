import AnlayticsCard from "@/components/analytics-card";
import { PageHeader, PageHeaderHeading } from "@/components/global/page-header";

const DashboardPage = async () => {
  return (
    <>
      <PageHeader>
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <div>
            <div className="flex space-x-4">
              <PageHeaderHeading size="sm" className="flex-1 text-heading-color">
                Dashboard
              </PageHeaderHeading>
            </div>
            {/* <PageHeaderDescription size="sm">Manage Leads</PageHeaderDescription> */}
          </div>
        </div>
      </PageHeader>
      <div className="mt-4 flex flex-col gap-5 md:flex-row">
        <div className="w-full">
          <AnlayticsCard />
        </div>
        <div className="w-full">
          <AnlayticsCard />
        </div>
        <div className="w-full">
          <AnlayticsCard />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
