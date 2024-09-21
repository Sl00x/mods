"use client";

import { ImageCarousel } from "@/components/Carousel/Carousel";
import {
  useGetModBySlugQuery,
  useLazyGetPreviewByCurrentVersionQuery,
} from "@/features/api/root-api";
import {
  RiDonutChartLine,
  RiDownload2Line,
  RiFile4Line,
  RiFoldersLine,
  RiShieldCheckLine,
} from "@remixicon/react";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface Params {
  params: { slug: string };
}

const Mod = ({ params: { slug } }: Params) => {
  const { data } = useGetModBySlugQuery(slug);
  const [getPreviewByCurrentVersion] = useLazyGetPreviewByCurrentVersionQuery();
  const [previews, setPreviews] = useState<string[] | undefined>();

  useEffect(() => {
    if (data?.versions) {
      getPreviewByCurrentVersion(data.versions[data.versions.length - 1].id)
        .unwrap()
        .then((data) => {
          setPreviews(data);
        })
        .catch((error) => {});
    }
  }, [data, getPreviewByCurrentVersion]);

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-5 gap-x-2">
        <div className="lg:col-span-5 col-span-5">
          <div className="w-full h-full">
            <ImageCarousel
              images={[
                "https://img.gta5-mods.com/q85-w800/images/fixes-improvements/a7fa70-spfixes.png", // The Legend of Zelda
                "https://img.gta5-mods.com/q75-w350-h233-cfill/images/fixes-improvements/4d1448-2h_weapons_fixes.png", // Red Dead Redemption 2
                "https://img.gta5-mods.com/q75-w350-h233-cfill/images/fixes-improvements/4d1448-a_m_y_business_02_shirt.png", // Cyberpunk 2077
              ]}
            >
              {data && (
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <h1 className="bg-black py-2 border-l-[5px] border-primary text-2xl uppercase text-white px-6">
                      {data?.name}
                    </h1>
                    <h1 className="bg-primary py-2 text-2xl uppercase text-white px-6">
                      {data?.versions &&
                        data.versions[data.versions.length - 1].version}
                    </h1>
                  </div>
                  <span className="bg-black text-white px-2 py-4 font-semibold text-xs">
                    {data?.game.name} -{" "}
                    {data?.plateform ? data?.plateform.name : "None"}
                  </span>
                </div>
              )}
            </ImageCarousel>
          </div>
        </div>
        <div className="lg:col-span-2 col-span-5 p-4">
          <div className="bg-white p-4 space-y-2 rounded-md shadow-md border border-gray-200">
            <div className="flex flex-row items-center space-x-2">
              <RiFoldersLine />
              <h1 className="text-xl font-semibold text-dark">Versions</h1>
            </div>
            <hr />
            {data?.versions ? (
              <>
                {data.versions.map((version) => (
                  <div
                    className="flex bg-light rounded-sm border border-gray-300 p-4 flex-row justify-between items-center"
                    key={version.id}
                  >
                    <div className="flex flex-col space-y-2">
                      <div className="flex flex-row space-x-2">
                        <RiFile4Line />
                        <h1 className="font-semibold text-dark text-xl">
                          {version.version}
                        </h1>
                      </div>
                      <span className="text-dark/50 text-xs italic">
                        0 Downloads, 0 Mo
                      </span>
                      <span className="text-dark/50 text-xs italic">
                        {new Date(version.created_at).toDateString()}
                      </span>
                    </div>
                    <div className="flex flex-row space-x-2">
                      {version.status === "VALID" ? (
                        <button type="button">
                          <RiDownload2Line />
                        </button>
                      ) : (
                        <RiDonutChartLine />
                      )}
                      {version.scan_link !== "" && (
                        <button type="button">
                          <RiShieldCheckLine
                            data-tooltip-id={version.id}
                            className="text-green-500"
                          />
                          <ReactTooltip
                            id={version.id}
                            place="bottom"
                            variant="dark"
                            content="This file has been scanned for viruses and is safe to download."
                          />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <span>No version found</span>
            )}
          </div>
        </div>
        <div className="lg:col-span-3 col-span-5 p-4">
          <MDEditor.Markdown
            source={data?.description}
            style={{ padding: 24 }}
            className="rounded-md border- border-gray-200 shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Mod;
