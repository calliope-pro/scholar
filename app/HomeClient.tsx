"use client";

import type { ScholarDataType } from "../lib/scholarships";
import { Fragment, useMemo, useState } from "react";
import { Listbox, RadioGroup, Switch, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon, ChevronUpDownIcon, XMarkIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import * as Slider from "@radix-ui/react-slider";

const grades = ["B1", "B2", "B3", "B4", "M1", "M2", "D1", "D2", "D3"];

interface HomeClientProps {
  initialScholarData: ScholarDataType[];
}

export default function HomeClient({ initialScholarData }: HomeClientProps) {
  const [scholarData] = useState<ScholarDataType[]>(initialScholarData);
  const [targets, setTargets] = useState<string[]>([]);
  const [duplication, setDuplication] = useState<"o" | "x" | "?">("?");
  const [expire, setExpire] = useState<undefined | string>();
  const [isExpireChecked, setIsExpireChecked] = useState(true);
  const [peopleRange, setPeopleRange] = useState<[number, number]>([0, 100]);
  const [isPeopleChecked, setIsPeopleChecked] = useState(true);
  const [amoutRange, setAmoutRange] = useState<[number, number]>([0, 500]);
  const [isAmountChecked, setIsAmountChecked] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const filteredScholarData = useMemo(() => {
    return scholarData.filter((scholarDatum) => {
      let matches = true;
      if (duplication !== "?") {
        matches = matches && scholarDatum["p他奨学金との重複"] == duplication;
      }
      if (targets.length > 0) {
        matches =
          matches &&
          targets.some((target) => scholarDatum["p対象者"].includes(target));
      }
      if (expire) {
        if (isExpireChecked && scholarDatum["p学内選考申請締切"] == "?") {
        } else {
          matches =
            matches &&
            new Date(scholarDatum["p学内選考申請締切"]) <= new Date(expire);
        }
      }
      if (
        scholarDatum["p年額"] &&
        (amoutRange[0] * 10000 > scholarDatum["p年額"] ||
          scholarDatum["p年額"] > amoutRange[1] * 10000)
      ) {
        matches = false;
      }
      if (!isAmountChecked && !scholarDatum["p年額"]) {
        matches = false;
      }
      if (
        scholarDatum["p推薦人数"] &&
        (peopleRange[0] > scholarDatum["p推薦人数"] ||
          scholarDatum["p推薦人数"] > peopleRange[1])
      ) {
        matches = false;
      }
      if (!isPeopleChecked && !scholarDatum["p推薦人数"]) {
        matches = false;
      }
      return matches;
    });
  }, [
    scholarData,
    duplication,
    targets,
    expire,
    isExpireChecked,
    isPeopleChecked,
    isAmountChecked,
    amoutRange,
    peopleRange,
  ]);

  const clearFilters = () => {
    setTargets([]);
    setDuplication("?");
    setExpire(undefined);
    setIsExpireChecked(true);
    setPeopleRange([0, 100]);
    setIsPeopleChecked(true);
    setAmoutRange([0, 500]);
    setIsAmountChecked(true);
  };

  const hasActiveFilters =
    targets.length > 0 ||
    duplication !== "?" ||
    expire !== undefined ||
    peopleRange[0] !== 0 ||
    peopleRange[1] !== 100 ||
    amoutRange[0] !== 0 ||
    amoutRange[1] !== 500;

  return (
    <>
      {/* Neo background */}
      <div className="neo-background"></div>

      <main className="min-h-screen relative z-10">
        {/* Skip link */}
        <a href="#results" className="skip-link">
          検索結果へスキップ
        </a>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* ========================================
              HERO SECTION - Bold & Clean
              ======================================== */}
          <header className="mb-12 fade-in">
            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
              {/* Logo & Title */}
              <div className="flex-1">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute -inset-3 bg-accent-sunset/10 rounded-2xl blur-xl"></div>
                      <Image
                        src="/logo.png"
                        alt="東京科学大学奨学金検索サイト"
                        width={280}
                        height={66}
                        priority
                        className="relative select-none"
                      />
                    </div>
                  </div>
                </div>
                <h1 className="sr-only">東京科学大学奨学金検索サイト</h1>
                <p className="mt-6 text-lg text-ink-medium max-w-2xl">
                  東京科学大学(東工大)の奨学金情報を整理・検索
                  <Link
                    href="https://www.titech.ac.jp/students/tuition/financial-aid/scholarships"
                    className="neo-link ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    公式サイト
                    <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </Link>
                </p>
              </div>

              {/* Result Counter - Featured */}
              <div className="neo-card-featured rounded-xl px-8 py-6 flex items-center gap-4">
                <div className="text-center">
                  <div className="text-5xl font-black">
                    {filteredScholarData.length}
                  </div>
                  <div className="text-sm mt-1 font-semibold">/ {scholarData.length}件</div>
                </div>
                <div className="w-px h-12 bg-white/20"></div>
                <div className="text-sm font-medium max-w-[100px]">
                  条件に一致する奨学金
                </div>
              </div>
            </div>
          </header>

          {/* ========================================
              MAIN CONTENT LAYOUT - Asymmetric
              ======================================== */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* ========================================
                FILTER SIDEBAR - Left Column
                ======================================== */}
            <aside className="lg:w-80 lg:flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center gap-3 neo-btn-primary"
                >
                  <AdjustmentsHorizontalIcon className="w-5 h-5" />
                  {showFilters ? "フィルターを非表示" : "フィルターを表示"}
                </button>
              </div>

              {/* Filter Panel */}
              <div className={`${showFilters ? 'block' : 'hidden'} lg:block fade-in-delayed`}>
                <div className="neo-card p-6 sticky top-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black">検索条件</h2>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm font-semibold text-accent-sunset hover:underline"
                      >
                        クリア
                      </button>
                    )}
                  </div>

                  <div className="space-y-8">
                    {/* 対象者 */}
                    <div>
                      <label className="block text-sm font-bold text-ink-dark mb-3">
                        対象者
                      </label>
                      <Listbox value={targets} onChange={setTargets} multiple>
                        <Listbox.Button
                          className="neo-input cursor-pointer flex items-center justify-between"
                          aria-label="対象者選択"
                        >
                          <span className="truncate">
                            {targets.length === 0
                              ? "選択してください"
                              : targets.join(", ")}
                          </span>
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-ink-light flex-shrink-0 ml-2"
                            aria-hidden="true"
                          />
                        </Listbox.Button>

                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-auto overflow-auto rounded-lg bg-white shadow-card border border-ink-light/10 focus:outline-none text-sm">
                            {grades.map((grade) => (
                              <Listbox.Option
                                key={grade}
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-3 px-4 ${
                                    active
                                      ? "bg-primary-blue/10 text-primary-blue"
                                      : "text-ink-dark hover:bg-base-sand"
                                  }`
                                }
                                value={grade}
                              >
                                {({ selected }) => (
                                  <div className="flex items-center justify-between">
                                    <span className={selected ? "font-bold" : ""}>
                                      {grade}
                                    </span>
                                    {selected && (
                                      <CheckIcon
                                        className="h-4 w-4 text-primary-blue"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </Listbox>
                    </div>

                    {/* 他奨学金との重複 */}
                    <div>
                      <label className="block text-sm font-bold text-ink-dark mb-3">
                        重複可否
                      </label>
                      <RadioGroup value={duplication} onChange={setDuplication}>
                        <div className="flex gap-2">
                          {[
                            { value: "o", label: "○ 可" },
                            { value: "x", label: "× 不可" },
                            { value: "?", label: "すべて" },
                          ].map(({ value, label }) => (
                            <RadioGroup.Option key={value} value={value} className="flex-1">
                              {({ checked }) => (
                                <span
                                  className={`cursor-pointer rounded-md px-3 py-2 text-center text-sm font-semibold transition-all ${
                                    checked
                                      ? "bg-primary-blue text-white shadow-lg"
                                      : "bg-base-sand text-ink-dark hover:bg-ink-light/10"
                                  }`}
                                >
                                  {label}
                                </span>
                              )}
                            </RadioGroup.Option>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* 学内選考申請締切 */}
                    <div>
                      <label className="block text-sm font-bold text-ink-dark mb-3">
                        締切日
                      </label>
                      <input
                        type="date"
                        className="neo-input"
                        value={expire ?? ""}
                        onChange={(e) => setExpire(e.target.value)}
                        aria-label="学内選考申請締切日"
                      />
                      {expire && (
                        <label className="flex items-center gap-3 mt-3 cursor-pointer">
                          <Switch
                            checked={isExpireChecked}
                            onChange={setIsExpireChecked}
                            className={`${
                              isExpireChecked
                                ? "bg-primary-blue"
                                : "bg-ink-light/30"
                            } relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-sunset focus:ring-offset-2`}
                          >
                            <span
                              className={`${
                                isExpireChecked ? "translate-x-4" : "translate-x-0"
                              } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                          </Switch>
                          <span className="text-sm text-ink-medium">不明を含む</span>
                        </label>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-ink-light/10"></div>

                    {/* 推薦人数 */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-bold text-ink-dark">
                          推薦人数
                        </label>
                        <span className="text-primary-blue font-black font-mono">
                          {peopleRange[0]}-{peopleRange[1]}人
                        </span>
                      </div>
                      <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={peopleRange}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => {
                          if (value[0] <= value[1]) {
                            setPeopleRange([value[0], value[1]]);
                          }
                        }}
                        aria-label="推薦人数の範囲"
                      >
                        <Slider.Track className="relative bg-ink-light/20 rounded-full flex-grow h-2 overflow-hidden">
                          <Slider.Range className="absolute bg-primary-blue rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary-blue rounded-full shadow-md cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-sunset transition-all" />
                        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-primary-blue rounded-full shadow-md cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-sunset transition-all" />
                      </Slider.Root>
                      <label className="flex items-center gap-3 mt-3 cursor-pointer">
                        <Switch
                          checked={isPeopleChecked}
                          onChange={setIsPeopleChecked}
                          className={`${
                            isPeopleChecked
                              ? "bg-primary-blue"
                              : "bg-ink-light/30"
                          } relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-sunset focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              isPeopleChecked ? "translate-x-4" : "translate-x-0"
                            } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                        <span className="text-sm text-ink-medium">直接応募・不明</span>
                      </label>
                    </div>

                    {/* 年額 */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-sm font-bold text-ink-dark">
                          年額
                        </label>
                        <span className="text-accent-sunset font-black font-mono">
                          {amoutRange[0]}-{amoutRange[1]}万円
                        </span>
                      </div>
                      <Slider.Root
                        className="relative flex items-center select-none touch-none w-full h-5"
                        value={amoutRange}
                        min={0}
                        max={500}
                        step={1}
                        onValueChange={(value) => {
                          if (value[0] <= value[1]) {
                            setAmoutRange([value[0], value[1]]);
                          }
                        }}
                        aria-label="年額の範囲"
                      >
                        <Slider.Track className="relative bg-ink-light/20 rounded-full flex-grow h-2 overflow-hidden">
                          <Slider.Range className="absolute bg-accent-sunset rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-accent-sunset rounded-full shadow-md cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-sunset transition-all" />
                        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-accent-sunset rounded-full shadow-md cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent-sunset transition-all" />
                      </Slider.Root>
                      <label className="flex items-center gap-3 mt-3 cursor-pointer">
                        <Switch
                          checked={isAmountChecked}
                          onChange={setIsAmountChecked}
                          className={`${
                            isAmountChecked
                              ? "bg-primary-blue"
                              : "bg-ink-light/30"
                          } relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-sunset focus:ring-offset-2`}
                        >
                          <span
                            className={`${
                              isAmountChecked ? "translate-x-4" : "translate-x-0"
                            } pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                          />
                        </Switch>
                        <span className="text-sm text-ink-medium">直接応募・不明</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* ========================================
                RESULTS COLUMN - Right Content
                ======================================== */}
            <div className="flex-1 min-w-0" id="results">
              {/* Screen reader announcement */}
              <div
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                検索結果が更新されました。{filteredScholarData.length}件の奨学金が見つかりました。
              </div>

              {/* Results List */}
              <div className="stagger space-y-5">
                {filteredScholarData.length === 0 ? (
                  // Empty State
                  <div className="neo-card p-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-ink-light/10 mb-6">
                      <XMarkIcon className="w-10 h-10 text-ink-light" />
                    </div>
                    <h3 className="text-2xl font-black text-ink-dark mb-3">
                      条件に一致する奨学金がありません
                    </h3>
                    <p className="text-ink-dark">
                      フィルター条件を変更するか、クリアしてください
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="mt-6 neo-btn-primary"
                      >
                        フィルターをクリア
                      </button>
                    )}
                  </div>
                ) : (
                  // Scholarship Cards
                  filteredScholarData.map((scholarColumn, index) => (
                    <article
                      key={scholarColumn["団体名"]}
                      id={scholarColumn["団体名"]}
                      className="neo-card group"
                    >
                      <div className="p-6 lg:p-8">
                        {/* Header - Organization Name */}
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`#${scholarColumn["団体名"]}`}
                              className="block"
                            >
                              <h3 className="text-2xl font-black text-ink-dark group-hover:text-primary-blue transition-colors">
                                {scholarColumn["団体名"]}
                              </h3>
                            </Link>
                            {scholarColumn["p年額"] && (
                              <div className="mt-2 inline-flex items-center gap-2">
                                <span className="neo-badge-accent">
                                  年額 {Math.round(scholarColumn["p年額"] / 10000)}万円
                                </span>
                              </div>
                            )}
                          </div>
                          <Link
                            href={`https://www.google.com/search?q=${encodeURIComponent(
                              scholarColumn["団体名"]
                            )}`}
                            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-accent-sunset text-white font-semibold rounded-lg hover:bg-accent-coral transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${scholarColumn["団体名"]}をGoogle検索`}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span className="hidden sm:inline">Googleで検索</span>
                            <span className="sm:hidden">Google</span>
                          </Link>
                        </div>

                        {/* Info Grid */}
                        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          {/* 備考 - Full Width */}
                          <div className="col-span-2 lg:col-span-4 bg-base-sand/50 rounded-lg p-4">
                            <dt className="font-bold text-ink-dark mb-1">備考</dt>
                            <dd className="text-ink-dark leading-relaxed">
                              {scholarColumn["備考"]}
                            </dd>
                          </div>

                          {/* 対象者 */}
                          <div>
                            <dt className="font-bold text-ink-medium text-xs uppercase tracking-wide mb-1">対象者</dt>
                            <dd className="text-ink-dark font-medium">
                              {scholarColumn["対象者"]}
                            </dd>
                          </div>

                          {/* 推薦人数 */}
                          <div>
                            <dt className="font-bold text-ink-medium text-xs uppercase tracking-wide mb-1">推薦人数</dt>
                            <dd className="text-ink-dark font-medium">
                              {scholarColumn["推薦人数"]}
                            </dd>
                          </div>

                          {/* 月額 */}
                          <div>
                            <dt className="font-bold text-ink-medium text-xs uppercase tracking-wide mb-1">月額</dt>
                            <dd className="text-ink-dark font-medium">
                              {scholarColumn["月額"]}
                            </dd>
                          </div>

                          {/* 重複可否 */}
                          <div>
                            <dt className="font-bold text-ink-medium text-xs uppercase tracking-wide mb-1">重複</dt>
                            <dd className="text-ink-dark font-medium">
                              {scholarColumn["他奨学金との重複"]}
                            </dd>
                          </div>

                          {/* 締切 - Full Width */}
                          <div className="col-span-2 lg:col-span-4 pt-2 border-t border-ink-light/10 flex items-center justify-between">
                            <div>
                              <dt className="font-bold text-ink-medium text-xs uppercase tracking-wide mb-1">学内選考締切</dt>
                              <dd className="text-ink-dark font-medium">
                                {scholarColumn["学内選考申請締切"]}
                              </dd>
                            </div>
                          </div>
                        </dl>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* ========================================
              FOOTER
              ======================================== */}
          <footer className="mt-16 pt-8 border-t border-ink-light/10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-ink-medium text-sm">
              <p>
                クレーム・要望は
                <Link
                  href="https://github.com/calliope-pro/scholar"
                  className="neo-link ml-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <svg className="inline-block w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
              </p>
              <div className="flex gap-4">
                <Link
                  href="/terms"
                  className="hover:text-ink-dark transition-colors"
                  target="_blank"
                >
                  利用規約
                </Link>
                <Link
                  href="/privacy"
                  className="hover:text-ink-dark transition-colors"
                  target="_blank"
                >
                  プライバシー
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
