import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import SearchedCourse from "./SearchedCourse";
import { useSearchCourseQuery } from "@/features/api/courseApi";
import { useSearchParams } from "react-router-dom";
import CourseNotFound from "./CourseNotFound";
import { Skeleton } from "@/components/ui/skeleton";

const technologyOptions = [
  { id: "javascript", label: "JavaScript" },
  { id: "react", label: "React" },
  { id: "next-js", label: "Next.js" },
  { id: "node-js", label: "Node.js" },
  { id: "express", label: "Express" },
  { id: "mongodb", label: "MongoDB" },
  { id: "docker", label: "Docker" },
  { id: "devops", label: "DevOps" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "uiux", label: "UI/UX" },
  { id: "data-science", label: "Data Science" },
];

const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .trim();

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [difficulty, setDifficulty] = useState("");
  const [sortBy, setSortBy] = useState("most-popular");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openSections, setOpenSections] = useState({
    technology: true,
    difficulty: true,
  });

  const { data, isLoading } = useSearchCourseQuery({
    query: searchTerm || "",
    categories: "",
    sortByPrice:
      sortBy === "price-low"
        ? "low"
        : sortBy === "price-high"
          ? "high"
          : "",
  });

  const filteredCourses = useMemo(() => {
    const courses = data?.courses || [];
    const term = searchTerm.trim().toLowerCase();

    return courses
      .filter((course) => {
        const searchableText = [
          course.courseTitle,
          course.subTitle,
          course.description,
          course.category,
          course.creator?.username,
          course.creator?.email,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        const matchesSearch = !term || searchableText.includes(term);
        const matchesTechnology =
          selectedTechnologies.length === 0 ||
          selectedTechnologies.some((tech) => {
            const techValue = normalize(tech);
            const courseValues = [
              course.category,
              ...(course.technologies || []),
            ].map((value) => normalize(value));

            return courseValues.includes(techValue);
          });
        const matchesDifficulty =
          !difficulty || normalize(course.courseLevel) === normalize(difficulty);

        return matchesSearch && matchesTechnology && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }

        if (sortBy === "price-low") {
          return (a.coursePrice || 0) - (b.coursePrice || 0);
        }

        if (sortBy === "price-high") {
          return (b.coursePrice || 0) - (a.coursePrice || 0);
        }

        return (b.enrolledStudents?.length || 0) - (a.enrolledStudents?.length || 0);
      });
  }, [data?.courses, difficulty, searchTerm, selectedTechnologies, sortBy]);

  const activeFilters = useMemo(() => {
    const filters = [];

    if (searchTerm.trim()) {
      filters.push({ type: "search", value: searchTerm.trim(), label: `Search: ${searchTerm.trim()}` });
    }

    selectedTechnologies.forEach((tech) => {
      const option = technologyOptions.find((item) => item.id === tech);
      filters.push({ type: "technology", value: tech, label: option?.label || tech });
    });

    if (difficulty) {
      filters.push({ type: "difficulty", value: difficulty, label: difficulty });
    }

    return filters;
  }, [difficulty, searchTerm, selectedTechnologies]);

  const toggleTechnology = (techId) => {
    setSelectedTechnologies((prev) =>
      prev.includes(techId) ? prev.filter((item) => item !== techId) : [...prev, techId],
    );
  };

  const removeFilter = (filter) => {
    if (filter.type === "search") {
      setSearchTerm("");
    } else if (filter.type === "technology") {
      setSelectedTechnologies((prev) => prev.filter((item) => item !== filter.value));
    } else if (filter.type === "difficulty") {
      setDifficulty("");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTechnologies([]);
    setDifficulty("");
    setSortBy("most-popular");
  };

  const renderFilterContent = () => (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70 p-4">
        <label className="mb-2 block text-sm font-semibold text-slate-200">Search</label>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-slate-900/80 px-3 py-2.5">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search courses"
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70">
        <button
          type="button"
          onClick={() => setOpenSections((prev) => ({ ...prev, technology: !prev.technology }))}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-sm font-semibold text-slate-200">Technology</span>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition ${openSections.technology ? "rotate-180" : ""}`} />
        </button>
        {openSections.technology ? (
          <div className="border-t border-slate-800/80 px-4 py-3">
            <div className="space-y-2">
              {technologyOptions.map((option) => {
                const checked = selectedTechnologies.includes(option.id);
                return (
                  <label key={option.id} className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-slate-300 transition hover:bg-slate-900/80">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleTechnology(option.id)}
                      className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500"
                    />
                    <span>{option.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/70">
        <button
          type="button"
          onClick={() => setOpenSections((prev) => ({ ...prev, difficulty: !prev.difficulty }))}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <span className="text-sm font-semibold text-slate-200">Difficulty</span>
          <ChevronDown className={`h-4 w-4 text-slate-400 transition ${openSections.difficulty ? "rotate-180" : ""}`} />
        </button>
        {openSections.difficulty ? (
          <div className="border-t border-slate-800/80 px-4 py-3">
            <div className="space-y-2">
              {difficultyOptions.map((option) => (
                <label key={option} className="flex cursor-pointer items-center gap-2 rounded-xl px-2 py-1.5 text-sm text-slate-300 transition hover:bg-slate-900/80">
                  <input
                    type="radio"
                    name="difficulty"
                    value={option}
                    checked={difficulty === option}
                    onChange={() => setDifficulty(option)}
                    className="h-4 w-4 border-slate-600 bg-slate-900 text-blue-500 focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={clearFilters}
        className="w-full rounded-2xl border border-slate-700/70 bg-slate-900/80 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500/60 hover:text-white"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 backdrop-blur">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-blue-400">Discover</p>
              <h1 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">Find the right course for your next skill</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Explore curated learning paths with a refined search experience that keeps the focus on what matters.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="hidden w-[280px] shrink-0 lg:block">
            <div className="sticky top-24 rounded-[28px] border border-slate-800/80 bg-slate-900/70 p-4 shadow-xl shadow-black/20">
              <div className="mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-blue-400" />
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Filters</h2>
              </div>
              {renderFilterContent()}
            </div>
          </aside>

          <div className="flex-1">
            <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/70 p-4 shadow-xl shadow-black/20 sm:p-5">
              <div className="flex flex-col gap-4 border-b border-slate-800/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    {isLoading ? "Loading courses..." : `${filteredCourses.length} results`}
                  </p>
                  <h2 className="text-lg font-semibold text-white">Courses matching your search</h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-sm font-medium text-slate-200 lg:hidden"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </button>

                  <label className="flex items-center gap-2 rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-sm text-slate-300">
                    <span className="hidden sm:inline">Sort by</span>
                    <select
                      value={sortBy}
                      onChange={(event) => setSortBy(event.target.value)}
                      className="bg-transparent text-sm text-slate-100 outline-none"
                    >
                      <option value="most-popular" className="bg-slate-900 text-slate-100">Most Popular</option>
                      <option value="newest" className="bg-slate-900 text-slate-100">Newest</option>
                      <option value="price-low" className="bg-slate-900 text-slate-100">Price: Low → High</option>
                      <option value="price-high" className="bg-slate-900 text-slate-100">Price: High → Low</option>
                    </select>
                  </label>
                </div>
              </div>

              {activeFilters.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeFilters.map((filter) => (
                    <button
                      key={`${filter.type}-${filter.value}`}
                      type="button"
                      onClick={() => removeFilter(filter)}
                      className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 text-sm text-blue-200 transition hover:bg-blue-500/20"
                    >
                      <span>{filter.label}</span>
                      <X className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 space-y-4">
                {isLoading ? (
                  [1, 2, 3].map((item) => <SearchCourseSkeleton key={item} />)
                ) : filteredCourses.length === 0 ? (
                  <CourseNotFound />
                ) : (
                  filteredCourses.map((course) => <SearchedCourse course={course} key={course._id} />)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm lg:hidden">
          <div className="absolute right-0 top-0 flex h-full w-[320px] flex-col border-l border-slate-800 bg-slate-950 p-4 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} className="rounded-full p-2 text-slate-400 hover:bg-slate-900 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            {renderFilterContent()}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchPage;

const SearchCourseSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[24px] border border-slate-800/80 bg-slate-950/70 p-4 animate-pulse md:flex-row md:items-center">
      <div className="h-36 w-full rounded-2xl bg-slate-800/80 md:w-56" />
      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-slate-800" />
        <Skeleton className="h-4 w-1/2 bg-slate-800" />
        <Skeleton className="h-4 w-1/4 bg-slate-800" />
        <Skeleton className="h-6 w-24 rounded-full bg-slate-800" />
      </div>
      <div className="w-full md:w-24">
        <Skeleton className="h-6 w-20 bg-slate-800" />
      </div>
    </div>
  );
};
