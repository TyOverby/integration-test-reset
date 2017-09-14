const status_items = Array.from(document.querySelectorAll(".branch-action .merge-status-item"));
const vsi_tests = status_items.filter(e => e.textContent.indexOf("integration_prtest") !== -1);

for (const bar of vsi_tests) {
    const status_svg = bar.querySelector("svg");
    const failed = status_svg.classList.contains("text-red");
    if (failed) {
        const name = bar.querySelector("strong").innerText;
        const details = bar.querySelector(".status-actions");
        const button = document.createElement("button");
        details.parentElement.insertBefore(button, details);

        button.innerText = "Retest";
        button.onclick = () => submit(name);
        button.className = "btn btn-sm";
    }
}

function submit(test_name) {
    const entry_box = document.querySelector("textarea#new_comment_field");
    const possible_submit_buttons = Array.from(document.querySelectorAll(".form-actions button.btn.btn-primary"));
    const submit_button = possible_submit_buttons.filter(b => b.innerText.trim() == "Comment")[0];
    entry_box.value = `@dotnet-bot test ${test_name} please`;
    submit_button.click();
}
