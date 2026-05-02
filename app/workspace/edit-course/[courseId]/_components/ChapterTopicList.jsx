
import { Gift } from "lucide-react";

function ChapterTopicList({ course }) {
  const courseLayout = course?.courseJson?.course;

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mt-5">Chapters & Topics</h2>

      <div className="flex flex-col items-center justify-center mt-10">
        {courseLayout?.chapters?.map((chapter, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-5 mb-10 w-full"
          >
            {/* Chapter Card */}
            <div className="p-4 border shadow rounded-xl bg-primary text-white w-80 text-center">
              <h2 className="text-lg font-semibold">Chapter {index + 1}</h2>
              <h2 className="font-bold text-xl">{chapter.chapterName}</h2>
              <div className="text-xs flex justify-between mt-2">
                <span>Duration: {chapter?.duration}</span>
                <span>Topics: {chapter?.topics?.length}</span>
              </div>
            </div>

            {/* Topics List */}
            <div className="flex flex-col items-center mt-5">
              {chapter?.topics?.map((topicObj, topicIndex) => (
                <div className="flex flex-col items-center" key={topicIndex}>
                  {/* Line above topic */}
                  <div className="h-10 bg-gray-300 w-1"></div>

                  {/* Topic bubble */}
                  <div className="flex items-center gap-5">
                    <span
                      className={`${
                        topicIndex % 2 === 0 ? "text-transparent" : ""
                      } max-w-xs text-sm text-gray-600 text-center`}
                      dangerouslySetInnerHTML={{ __html: topicObj.content }}
                    />

                    <h2 className="text-center rounded-full bg-gray-300 px-6 text-gray-700 py-4 font-semibold">
                      {topicIndex + 1}
                    </h2>

                    <span
                      className={`${
                        topicIndex % 2 !== 0 ? "text-transparent" : ""
                      } max-w-xs text-sm text-gray-600 text-center`}
                      dangerouslySetInnerHTML={{ __html: topicObj.content }}
                    />
                  </div>

                  {/* Gift icon at the end */}
                  {topicIndex === chapter.topics.length - 1 && (
                    <>
                      <div className="h-10 bg-gray-300 w-1"></div>
                      <div className="flex items-center gap-5">
                        <Gift className="text-center rounded-full bg-gray-300 h-14 w-14 text-gray-500 p-4" />
                      </div>
                      <div className="h-10 bg-gray-300 w-1"></div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Finish Button */}
        <div className="p-4 border shadow rounded-xl bg-green-600 text-white mt-5">
          <h2 className="text-lg font-bold">Finish</h2>
        </div>
      </div>
    </div>
  );
}

export default ChapterTopicList;
