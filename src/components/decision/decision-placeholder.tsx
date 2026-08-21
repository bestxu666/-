'use client';

export function DecisionPlaceholder() {
  return (
    <div className="card px-5 py-9 text-center">
      <div className="text-[14.5px] font-semibold text-ink">等待启动决策推理</div>
      <div className="mt-1 text-[12px] text-ink-3">
        请在上方工作台中确认地质力学分组参数后点击「启动智能推理与决策」，
        系统将自动完成工法选配、支护设计与成拱校核闭环。
      </div>
    </div>
  );
}
