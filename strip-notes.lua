-- Removes speaker notes so the published deck cannot spoil the traps.
--
-- Notes are stripped ALWAYS, unless the document sets `keep-notes: true`.
-- The "teach" profile sets exactly that and nothing else. Defaulting to
-- stripped means publishing is safe even if you forget which profile you are in.
--
-- Two passes: the first reads the metadata, the second edits the body. Pandoc
-- runs the tables in order, so `keep` is already correct by the time Div runs.
local keep = false

return {
  {
    Meta = function (meta)
      local flag = meta["keep-notes"]
      if flag ~= nil and flag ~= false then keep = true end
    end
  },
  {
    Div = function (el)
      if not keep and el.classes:includes("notes") then return {} end
    end
  }
}
