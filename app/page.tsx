"use client";

import type { ScholarDataType } from "./api/scholarships/route";
import { Fragment, useMemo, useState } from "react";
import { Listbox, RadioGroup, Switch, Transition } from "@headlessui/react";
import Link from "next/link";
import Image from "next/image";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import useSWR from "swr";
import * as Slider from "@radix-ui/react-slider";

const grades = ["B1", "B2", "B3", "B4", "M1", "M2", "D1", "D2", "D3"];

const fetcher = async () => {
  const response = await fetch("/api/scholarships");
  const data: ScholarDataType[] = await response.json();
  return data;
};

export default function Home() {
  const { data: scholarData } = useSWR("AA", fetcher);
  const [targets, setTargets] = useState<string[]>([]);
  const [duplication, setDuplication] = useState<"o" | "x" | "?">("?");
  const [expire, setExpire] = useState<undefined | string>();
  const [isExpireChecked, setIsExpireChecked] = useState(true);
  const [peopleRange, setPeopleRange] = useState<[number, number]>([0, 100]);
  const [isPeopleChecked, setIsPeopleChecked] = useState(true);
  const [amoutRange, setAmoutRange] = useState<[number, number]>([0, 500]);
  const [isAmountChecked, setIsAmountChecked] = useState(true);

  const filteredScholarData = useMemo(() => {
    return (scholarData ?? []).filter((scholarDatum) => {
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
          // 不明含むならスキップ条件なし
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

  return (
    <>
      <div className="freeform-gradient">
        <div className="blob1"></div>
        <div className="blob2"></div>
      </div>
      <main className="min-h-screen relative z-10">
        <div className="container mx-auto max-w-5xl px-4 py-8">
        {/* ロゴ＆説明 */}
        <div className="mb-8 morphism-card rounded-3xl p-8 flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={440} // 元画像の自然な横幅
            height={120} // 元画像の自然な高さ
            priority
            className="mb-6 select-none w-auto max-w-full h-auto"
          />
          <p className="text-slate-100 text-lg text-center max-w-xl font-medium">
            <Link
              href="https://www.titech.ac.jp/students/tuition/financial-aid/scholarships"
              className="text-amber-300 hover:text-amber-200 font-bold underline underline-offset-2 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              東工大奨学金サイト
            </Link>
            の情報をより見やすく整理し、効率的に検索できるようにしたサイトです
          </p>
        </div>

        {/* フィルターセクション */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 morphism-card rounded-3xl p-10 mb-10">
          {/* 対象者 */}
          <div className="grid">
            <label className="block text-sm font-bold text-slate-100 mb-3 select-none uppercase tracking-wide">
              対象者
            </label>
            <div>
              <Listbox value={targets} onChange={setTargets} multiple>
                  <Listbox.Button
                    className="relative w-full cursor-pointer rounded-xl bg-white/10 py-4 pl-5 pr-12 text-left border-2 border-slate-300/50 hover:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                    aria-label="対象者選択"
                  >
                    <span className="block truncate font-medium text-slate-100">
                      {targets.length === 0
                        ? "選択してください"
                        : targets.join(", ")}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-slate-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-slate-800/90 backdrop-blur-sm shadow-lg ring-1 ring-slate-600 focus:outline-none text-sm text-slate-100">
                      {grades.map((grade) => (
                        <Listbox.Option
                          key={grade}
                          className={({ active }) =>
                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-orange-100 text-orange-900"
                                : "text-slate-100"
                            }`
                          }
                          value={grade}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-semibold" : "font-normal"
                                }`}
                              >
                                {grade}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-300">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
              </Listbox>
            </div>
          </div>

          {/* 他奨学金との重複 */}
          <div className="grid">
            <label className="block text-sm font-bold text-slate-100 mb-3 select-none uppercase tracking-wide">
              他奨学金との重複
            </label>
            <RadioGroup
              value={duplication}
              onChange={setDuplication}
            >
              <div className="flex space-x-4">
                {[
                  { value: "o", label: "o" },
                  { value: "x", label: "x" },
                  { value: "?", label: "すべて" },
                ].map(({ value, label }) => (
                  <RadioGroup.Option key={value} value={value}>
                    {({ checked }) => (
                      <span
                        className={`cursor-pointer rounded-xl px-5 py-2 shadow-sm ring-1 ring-inset ring-slate-300 select-none 
                          ${
                            checked
                              ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg ring-2 ring-blue-300"
                              : "bg-white/10 text-slate-100 hover:bg-white/20 border border-slate-300/50"
                          } transition-colors duration-300`}
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
          <div className="grid">
            <label className="block text-sm font-bold text-slate-100 mb-3 select-none uppercase tracking-wide">
              学内選考申請締切
            </label>
            <input
              type="date"
              className="block w-full rounded-xl border-2 border-slate-300/50 bg-white/10 py-4 px-5 text-slate-100 shadow-lg hover:border-orange-400 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-200 focus:border-orange-500 sm:text-sm transition-all duration-300 placeholder-slate-300"
              value={expire ?? ""}
              onChange={(e) => setExpire(e.target.value)}
              aria-label="学内選考申請締切日"
            />
            {expire && (
              <div className="mt-3 flex items-center select-none">
                <Switch
                  checked={isExpireChecked}
                  onChange={setIsExpireChecked}
                  className={`${
                    isExpireChecked ? "bg-gradient-to-r from-blue-500 to-cyan-400" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 shadow-lg`}
                >
                  <span className="sr-only">不明含む</span>
                  <span
                    className={`${
                      isExpireChecked ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                  />
                </Switch>
                <span className="ml-3 text-sm text-slate-200">不明含む</span>
              </div>
            )}
          </div>
        </div>

        {/* 推薦人数 & 年額フィルター */}
        <div className="morphism-card rounded-3xl p-10 mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 推薦人数 */}
            <div>
              <label
                htmlFor="peopleRange"
                className="block text-sm font-bold text-slate-100 mb-4 select-none uppercase tracking-wide"
              >
                推薦人数 ({peopleRange[0]}~{peopleRange[1]}人)
              </label>
              <Slider.Root
                id="peopleRange"
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
                <Slider.Track className="relative bg-slate-300 rounded-full flex-grow h-3 shadow-inner">
                  <Slider.Range className="absolute bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full h-full shadow-sm" />
                </Slider.Track>
                <Slider.Thumb className="block w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 border-2 border-white" />
                <Slider.Thumb className="block w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 border-2 border-white" />
              </Slider.Root>
              <div className="mt-4 flex items-center select-none">
                <Switch
                  checked={isPeopleChecked}
                  onChange={setIsPeopleChecked}
                  className={`${
                    isPeopleChecked ? "bg-gradient-to-r from-blue-500 to-cyan-400" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 shadow-lg`}
                >
                  <span className="sr-only">直接応募・不明含む</span>
                  <span
                    className={`${
                      isPeopleChecked ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                  />
                </Switch>
                <span className="ml-3 text-sm text-slate-200">
                  直接応募・不明含む
                </span>
              </div>
            </div>

            {/* 年額 */}
            <div>
              <label
                htmlFor="amountRange"
                className="block text-sm font-bold text-slate-100 mb-4 select-none uppercase tracking-wide"
              >
                年額 ({amoutRange[0]}~{amoutRange[1]}万円)
              </label>
              <Slider.Root
                id="amountRange"
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
                <Slider.Track className="relative bg-slate-300 rounded-full flex-grow h-3 shadow-inner">
                  <Slider.Range className="absolute bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full h-full shadow-sm" />
                </Slider.Track>
                <Slider.Thumb className="block w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 border-2 border-white" />
                <Slider.Thumb className="block w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 border-2 border-white" />
              </Slider.Root>
              <div className="mt-4 flex items-center select-none">
                <Switch
                  checked={isAmountChecked}
                  onChange={setIsAmountChecked}
                  className={`${
                    isAmountChecked ? "bg-gradient-to-r from-blue-500 to-cyan-400" : "bg-gray-300"
                  } relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 shadow-lg`}
                >
                  <span className="sr-only">直接応募・不明含む</span>
                  <span
                    className={`${
                      isAmountChecked ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300`}
                  />
                </Switch>
                <span className="ml-3 text-sm text-slate-200">
                  直接応募・不明含む
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 検索結果 */}
        <div className="flex justify-end mb-8">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full px-6 py-3 shadow-xl select-none ring-2 ring-blue-300">
            検索結果: {filteredScholarData.length}/{(scholarData || []).length}
            件
          </span>
        </div>

        {/* 奨学金一覧カード */}
        <div className="space-y-10">
          {filteredScholarData.map((scholarColumn) => (
            <div
              key={scholarColumn["団体名"]}
              id={scholarColumn["団体名"]}
              className="morphism-card-subtle rounded-3xl cursor-pointer select-none"
            >
              <div className="px-10 py-6 border-b border-slate-400/30">
                <Link
                  href={`#${scholarColumn["団体名"]}`}
                  className="text-2xl font-extrabold tracking-tight text-slate-100 hover:text-cyan-300 transition-all duration-300"
                >
                  {scholarColumn["団体名"]}
                </Link>
              </div>
              <div className="px-10 py-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <dt className="text-sm font-semibold text-slate-300">備考</dt>
                  <dd className="mt-2 text-base text-slate-100">
                    {scholarColumn["備考"]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-300 uppercase">
                    対象者
                  </dt>
                  <dd className="mt-1 text-sm text-slate-100">
                    {scholarColumn["対象者"]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-300 uppercase">
                    推薦人数
                  </dt>
                  <dd className="mt-1 text-sm text-slate-100">
                    {scholarColumn["推薦人数"]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-300 uppercase">
                    月額
                  </dt>
                  <dd className="mt-1 text-sm text-slate-100">
                    {scholarColumn["月額"]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-300 uppercase">
                    他奨学金との重複
                  </dt>
                  <dd className="mt-1 text-sm text-slate-100">
                    {scholarColumn["他奨学金との重複"]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-300 uppercase">
                    学内選考申請締切
                  </dt>
                  <dd className="mt-1 text-sm text-slate-100">
                    {scholarColumn["学内選考申請締切"]}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-slate-300 uppercase">
                    Google URL
                  </dt>
                  <dd className="mt-1 text-sm text-slate-100">
                    <Link
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        scholarColumn["団体名"]
                      )}`}
                      className="text-amber-300 hover:text-amber-200 font-bold transition-all duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {scholarColumn["団体名"]}
                    </Link>
                  </dd>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* フッター */}
        <footer className="morphism-card mt-20 py-12 rounded-3xl select-none">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-slate-200 text-sm font-medium">
              <p>
                クレームはこちらへ
                <Link
                  href="https://github.com/calliope-pro/scholar"
                  className="text-cyan-300 hover:text-cyan-200 ml-2 inline-flex items-center underline underline-offset-2 transition-all duration-300 font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </p>
              <Link
                href="/terms"
                className="hover:text-cyan-300 underline underline-offset-2 transition-all duration-300 font-medium"
                target="_blank"
              >
                利用規約
              </Link>
              <Link
                href="/privacy"
                className="hover:text-cyan-300 underline underline-offset-2 transition-all duration-300 font-medium"
                target="_blank"
              >
                プライバシーポリシー
              </Link>
            </div>
          </div>
        </footer>
        </div>
      </main>
    </>
  );
}
